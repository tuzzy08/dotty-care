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
import axios from 'axios';
import { SignupData } from '../pages/dashboard/components/SignupForm';

export type AuthResponse = {
	user: User | null;
	session: Session | null;
};

async function getToken(id: string = '', email: string = '') {
	const { data } = await axios.post('/api/auth/login', {
		id,
		email,
	});

	return data;
}

export type AuthContextProps = {
	signUp: (payload: SupabaseSignupPayload) => Promise<AuthResponse | null>;
	signIn: (payload: SupabaseSignInPayload) => Promise<AuthResponse | null>;
	signOut: () => void;
	setAuthToken: Dispatch<SetStateAction<string | null>>;
	authToken: string | null;
	loggedIn: boolean;
	loading: boolean;
	userLoading: boolean;
	permissions: any;
	setPermissions: Dispatch<SetStateAction<string | null>>;
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
	const [permissions, setPermissions] = useState<string | null>(null);
	// const { handleMessage } = useMessage()

	useEffect(() => {
		const initializeUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			const accountType: string = user?.user_metadata.accountType;
			setUserLoading(false);
			if (user) {
				setUser(user);
				// setLoggedin(true)
				// if(user.user_metadata)
				const path = accountDashboards[accountType as keyof Dashboards];
				// TODO: Get the current path and remain on it if its just a page refresh.
				path && router.push(path);
			}
		};
		initializeUser();

		// Listen for auth events such as sign in & sign out etc..
		supabase.auth.onAuthStateChange(async (event, session) => {
			console.log('Auth EVENT');
			console.log(event);

			const user = session?.user! ?? null;
			const accountType: string = user?.user_metadata.accountType;
			setUserLoading(false);
			if (user) {
				setUser(user);
				setLoggedin(true);
				if (event === 'SIGNED_IN') {
					try {
						const token = await getToken(user.user_metadata.id, user.email);
						console.log('Retrieved Token');
						console.log(token);

						if (token) {
							setAuthToken(token);
							router.push(
								`${accountDashboards[accountType as keyof Dashboards]}`
							);
						}
					} catch (error) {
						console.log(error);
					}

					// Your users will automatically be redirected to the `/profile` page on logging in
				}
			} else {
				// new
				setUser(null); // new: nullify the user object
				router.push(ROUTE_AUTH); // new: redirect to the home page
			}
		});
	}, []);

	const signUp = async (payload: SignupData): Promise<AuthResponse | null> => {
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
				permissions,
				setPermissions,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
