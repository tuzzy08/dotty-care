// ROUTE_CONFIG
export const ROUTE_HOME_USERS = '/dashboard/users';
export const ROUTE_HOME_EMS = '/dashboard/ems';
export const ROUTE_HOME_HOSPITAL = '/dashboard/hospital';
export const ROUTE_AUTH = '/';
export const ROUTE_HOME_ADMIN = '/dashboard/admin';

// ACCOUNT_TYPES
// export const PATIENT = 'User'
// export const EMS = 'Ems'
// export const HOSPITAL = 'Hospital'

export interface Dashboards {
	Patient: string;
	Ems: string;
	Hospital: string;
	Admin: string;
}

export const accountDashboards: Dashboards = {
	Patient: ROUTE_HOME_USERS,
	Ems: ROUTE_HOME_EMS,
	Hospital: ROUTE_HOME_HOSPITAL,
	Admin: ROUTE_HOME_ADMIN,
};
