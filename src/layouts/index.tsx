import UserDashboard from './userDashboard';

interface Props {
  children: React.ReactNode;
  variant: String;
}

export function Layout({ variant, children }: Props) {
  if (variant === 'user') return (<UserDashboard>{children}</UserDashboard>);
  // TODO: CREATE A GENERIC LAYOUT TO BE RETURNED!
  return (<UserDashboard>{children}</UserDashboard>)
}