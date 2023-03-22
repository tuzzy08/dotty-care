import { useState } from 'react';
import Link from 'next/link';
import { Badge, createStyles, Group, Navbar } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import { Menu_Item } from './links';
import { useAuth } from '../../../lib/auth';

const useStyles = createStyles((theme, _params, getRef) => {
	const icon = getRef('icon');
	return {
		navbar: {
			backgroundColor: theme.fn.variant({
				variant: 'filled',
				color: theme.primaryColor,
			}).background,
			// height: '100vh',
		},

		version: {
			backgroundColor: theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
					.background!,
				0.1
			),
			color: theme.white,
			fontWeight: 700,
		},

		header: {
			paddingBottom: theme.spacing.md,
			marginBottom: theme.spacing.md * 1.5,
			borderBottom: `1px solid ${theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
					.background!,
				0.1
			)}`,
		},

		footer: {
			// paddingTop: theme.spacing.md,
			// marginTop: theme.spacing.md,
			borderTop: `1px solid ${theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
					.background!,
				0.1
			)}`,
		},

		link: {
			...theme.fn.focusStyles(),
			display: 'flex',
			alignItems: 'center',
			textDecoration: 'none',
			fontSize: theme.fontSizes.sm,
			color: theme.white,
			padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
			borderRadius: theme.radius.sm,
			fontWeight: 500,

			'&:hover': {
				backgroundColor: theme.fn.lighten(
					theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
						.background!,
					0.1
				),
				cursor: 'pointer',
			},
		},

		linkIcon: {
			ref: icon,
			color: theme.white,
			opacity: 0.75,
			marginRight: theme.spacing.sm,
		},

		linkActive: {
			'&, &:hover': {
				backgroundColor: theme.fn.lighten(
					theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
						.background!,
					0.15
				),
				[`& .${icon}`]: {
					opacity: 0.9,
				},
			},
		},
	};
});

interface Props {
	opened: boolean;
	data: Array<Menu_Item>;
}

export default function NavbarSimpleColored({ opened, data }: Props) {
	const { classes, cx } = useStyles();
	const [active, setActive] = useState('Billing');
	const { signOut, authToken } = useAuth();

	const links = data.map((item) => (
		<Link
			className={cx(classes.link, {
				[classes.linkActive]: item.label === active,
			})}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				// event.preventDefault();
				setActive(item.label);
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</Link>
	));

	return (
		<Navbar
			width={{ sm: 200, lg: 250 }}
			hidden={!opened}
			p='md'
			className={classes.navbar}
		>
			{/* {authToken ? (
				<Badge color='green' variant='filled'>
					connected
				</Badge>
			) : null} */}
			<Navbar.Section grow>
				<Group className={classes.header} position='apart'>
					{/* <MantineLogo size={28} inverted /> */}
				</Group>
				{links}
			</Navbar.Section>

			<Navbar.Section className={classes.footer}>
				{/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a> */}
				{/* <IconLogout className={classes.linkIcon} stroke={1.5} />
				<span>Logout</span> */}

				<Navbar.Section className={classes.link} onClick={signOut} grow>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span className={classes.link}>Logout</span>
				</Navbar.Section>
			</Navbar.Section>
		</Navbar>
	);
}
