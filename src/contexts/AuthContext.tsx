import { createContext, FunctionComponent, useState, useEffect } from 'react';
import { useSupabaseClient, User, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router'
import { Database } from '../lib/types/supabase';
import { SupabaseSignInPayload, SupabaseSignupPayload } from '../lib/auth/auth.types';
import { ROUTE_AUTH, ROUTE_HOME_USERS, ROUTE_HOME_EMS, ROUTE_HOME_HOSPITAL, accountDashboards, Dashboards } from '../config';


export type AuthContextProps = {
    signUp: (payload: SupabaseSignupPayload) => void,
    signIn: (payload: SupabaseSignInPayload) => void,
    signOut: () => void, 
    loggedIn: boolean, 
    loading: boolean, 
    userLoading: boolean }

export const AuthContext = createContext<Partial<AuthContextProps>>({})

export function AuthProvider({
    children,
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = useSupabaseClient();
  //TODO: SET CORRECT TYPE FOR USER 
  const [ user, setUser ] = useState<User | null>(null)
  const [ userLoading, setUserLoading ] = useState(true)
  const [ loggedIn, setLoggedin ] = useState(false)
    // const { handleMessage } = useMessage()
  
  useEffect(() => {
    const initializeUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const accountType: string = user?.user_metadata.accountType;
      console.log('IN-CONTEXT')
      console.log(user)
      setUserLoading(false)
    if (user) {
      setUser(user)
      
      // setLoggedin(true)
      // if(user.user_metadata)
      
        router.push(`${accountDashboards[accountType as keyof Dashboards]}`)
    }
    }
    
    initializeUser();    

    const onAuthStateChanged = async () => {
     const { data: authListener } = await supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null
        setUserLoading(false)
        if (user) {
          setUser(user)
          setLoggedin(true)
          router.push(ROUTE_HOME_USERS) // Your users will automatically be redirected to the `/profile` page on logging in
        } else { // new
          setUser(null) // new: nullify the user object
          router.push(ROUTE_AUTH) // new: redirect to the home page
        }
      });
    }
    onAuthStateChanged();
       
}, [])


    const signUp = async (payload: SupabaseSignupPayload): Promise<void> => {
        try {
          setLoading(true)
          const { error } = await supabase.auth.signUp(payload)
          if (error) {
            console.log({ message: error.message, type: 'error' })
          }
          else {
            console.log({ message: 'Signup successful. Please check your inbox for a confirmation email!', type: 'success' })
          }
        } catch (error: any) {
          console.log({ message: error.error_description || error, type: 'error' })
        } finally {
          setLoading(false)
        }
    }

    const signIn = async (payload: SupabaseSignInPayload): Promise<void> => {
        try {
            setLoading(true)
          const { error } = await supabase.auth.signInWithPassword(payload)
          if (error) {
            console.log({ message: error.message, type: 'error' })
          } else {
            console.log({ message: 'Log in successful. I\'ll redirect you once I\'m done', type: 'success' })
          }
        } catch (error) {
          console.log({ message: error.error_description || error, type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const signOut = async () => await supabase.auth.signOut()
 


    return (<AuthContext.Provider value={{
                signUp,
                signIn,
                signOut, // new
                loggedIn, // new
                loading, // new
                userLoading // // new
            }}>
            {children}
        </AuthContext.Provider>
    )
}

