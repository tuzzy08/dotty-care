import { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

export const useAuth = ():Partial<AuthContextProps> => {
    const context = useContext(AuthContext)

    if (context === undefined) {
      throw new Error(
        'useAuth must be used within an AuthContext.Provider'
      )
    }

    return context
}
