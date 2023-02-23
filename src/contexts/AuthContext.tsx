import { EventEmitter } from 'events';
import {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from 'react';
import { useSupabaseClient, User, Session } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import {
	SupabaseSignInPayload,
	SupabaseSignupPayload,
} from '../lib/auth/auth.types';
import { ROUTE_AUTH, accountDashboards, Dashboards } from '../config';
import { deleteCookie } from 'cookies-next';

export type AuthResponse = {
	user: User | null;
	session: Session | null;
};

export type AuthContextProps = {
	signUp: (payload: SupabaseSignupPayload) => Promise<AuthResponse | null>;
	signIn: (payload: SupabaseSignInPayload) => Promise<AuthResponse | null>;
	signOut: () => void;
	setAuthToken: Dispatch<SetStateAction<string | null>>;
	authToken: string | null;
	loggedIn: boolean;
	loading: boolean;
	userLoading: boolean;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const appEventEmitter = new EventEmitter().on('', (data) => {});

appEventEmitter;

export function AuthProvider({ children }: any) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [authToken, setAuthToken] = useState<string | null>(null);
	const supabase = useSupabaseClient();
	const [user, setUser] = useState<User | null>(null);
	const [userLoading, setUserLoading] = useState(true);
	const [loggedIn, setLoggedin] = useState(false);
	// const { handleMessage } = useMessage()

	useEffect(() => {
		const initializeUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			const accountType: string = user?.user_metadata.accountType;
			// console.log('IN-CONTEXT')
			// console.log(user)
			setUserLoading(false);
			if (user) {
				setUser(user);
				// setLoggedin(true)
				// if(user.user_metadata)
				console.log('Account Type');
				console.log(accountType);
				const path = accountDashboards[accountType as keyof Dashboards];
				// console.log('path')
				// console.log(path)
				// TODO: Get the current path and remain on it if its just a page refresh.
				path && router.push(path);
			}
		};
		initializeUser();

		// Listen for auth events such as sign in & sign out etc..
		supabase.auth.onAuthStateChange(async (event, session) => {
			const user = session?.user! ?? null;
			const accountType: string = user?.user_metadata.accountType;
			setUserLoading(false);
			if (user) {
				setUser(user);
				setLoggedin(true);
				router.push(`${accountDashboards[accountType as keyof Dashboards]}`); // Your users will automatically be redirected to the `/profile` page on logging in
			} else {
				// new
				setUser(null); // new: nullify the user object
				router.push(ROUTE_AUTH); // new: redirect to the home page
			}
		});
	}, []);

	const signUp = async (
		payload: SupabaseSignupPayload
	): Promise<AuthResponse | null> => {
		let response = null;
		try {
			setLoading(true);
			const { data, error } = await supabase.auth.signUp(payload);
			if (error) {
				console.log({ message: error.message, type: 'error' });
			} else {
				console.log({
					message:
						'Signup successful. Please check your inbox for a confirmation email!',
					type: 'success',
				});
				response = data;
			}
		} catch (error: any) {
			console.log({ message: error.error_description || error, type: 'error' });
		} finally {
			setLoading(false);
		}
		return response;
	};

	const signIn = async (
		payload: SupabaseSignInPayload
	): Promise<AuthResponse | null> => {
		let res: any = {};
		try {
			setLoading(true);
			const { data, error } = await supabase.auth.signInWithPassword(payload);
			if (error) {
				console.log({ message: error.message, type: 'error' });
			} else {
				console.log({
					message: "Log in successful. I'll redirect you once I'm done",
					type: 'success',
				});
				if (data) {
					res = data;
				}
			}
		} catch (error: any) {
			console.log({ message: error.error_description || error, type: 'error' });
		} finally {
			setLoading(false);
		}
		return res;
	};

	const signOut = async () => {
		deleteCookie('token');
		await supabase.auth.signOut();
	};

	return (
		<AuthContext.Provider
			value={{
				signUp,
				signIn,
				signOut,
				loggedIn,
				loading,
				userLoading,
				authToken,
				setAuthToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
