import UserDashboard from './userDashboard';
import HospitalDashboard from './hospitalDashboard';
import EMSDashboard from './emsDashboard';
import AdminLayout from './adminDashboard';

interface Props {
	children: React.ReactNode;
	variant: String;
}

export function Layout({ variant, children }: Props) {
	if (variant === 'patient') return <UserDashboard>{children}</UserDashboard>;
	if (variant === 'hospital')
		return <HospitalDashboard>{children}</HospitalDashboard>;
	if (variant === 'ems') return <EMSDashboard>{children}</EMSDashboard>;
	if (variant === 'admin') return <AdminLayout>{children}</AdminLayout>;

	// TODO: CREATE A GENERIC LAYOUT TO BE RETURNED!
	return <UserDashboard>{children}</UserDashboard>;
}
