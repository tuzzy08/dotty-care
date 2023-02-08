import AdminLayout from './admin';

interface Props {
  children: React.ReactNode;
  variant: String;
}

export function Layout({variant = 'admin', children}: Props) {
  return (<AdminLayout>{ children }</AdminLayout>)
}