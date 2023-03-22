import { useState } from 'react';
import { AppProps } from 'next/app';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { AuthProvider } from '../contexts/AuthContext';

createStore({
	paramedicNoteState: {
		noteID: '',
		patientName: '',
		paramedicName: '',
		patient_ID: '',
		paramedicID: '',
		paramedicEmail: '',
		incidentDetails: {
			servicecode: '',
			servicetype: '',
			dateofincident: '',
			timeofincident: '',
			street: '',
			province: '',
			postalcode: '',
			destinationstreet: '',
			destinationprovince: '',
			destinationpostalcode: '',
			responsibility: '',
			number: '',
			factors: '',
			disposition: '',
		},
		assessmentDetails: {
			neuroResponse: {
				normal: '',
				confused: '',
				combative: '',
				dysphasia: '',
				hallucinations: '',
				seizures: '',
				lethargic: '',
				tremors: '',
				others: '',
			},
			bodyAssessment: {
				cardiovascular: '',
				endocrine: '',
				centralNervousSystem: '',
				gI: '',
				musculoskeletal: '',
				integumentary: '',
				reproductive: '',
				respiratory: '',
				renal: '',
			},
			generalAssessment: {
				gI: '',
				musculoskeletal: '',
				integumentary: '',
				reproductive: '',
				respiratory: '',
				renal: '',
				asthma: '',
				cHF: '',
				diabetes: '',
				hypertension: '',
				seizureDisorder: '',
				stroke: '',
				cancer: '',
				cOPD: '',
				angina: '',
				myocardialInfraction: '',
				renalDisease: '',
				psychiatricIllness: '',
				dNROrder: '',
				other: '',
			},
		},
		treatmentDetails: {
			procedureStartTime: '',
			procedureType: '',
			procedureEndTime: '',
			deviceType: '',
			treatmentType: '',
		},
	},
	recordState: {
		recordID: '',
		patientName: '',
		patientID: '',
		doctorName: '',
		doctorID: '',
		doctorEmail: '',
		hospitalName: '',

		assessmentDetails: {
			neuroResponse: {
				normal: '',
				confused: '',
				combative: '',
				dysphasia: '',
				hallucinations: '',
				seizures: '',
				lethargic: '',
				tremors: '',
				others: '',
			},
			bodyAssessment: {
				cardiovascular: '',
				endocrine: '',
				centralNervousSystem: '',
				gI: '',
				musculoskeletal: '',
				integumentary: '',
				reproductive: '',
				respiratory: '',
				renal: '',
			},
			generalAssessment: {
				gI: '',
				musculoskeletal: '',
				integumentary: '',
				reproductive: '',
				respiratory: '',
				renal: '',
				asthma: '',
				cHF: '',
				diabetes: '',
				hypertension: '',
				seizureDisorder: '',
				stroke: '',
				cancer: '',
				cOPD: '',
				angina: '',
				myocardialInfraction: '',
				renalDisease: '',
				psychiatricIllness: '',
				dNROrder: '',
				other: '',
			},
		},
		treatmentDetails: {
			procedureStartTime: '',
			procedureType: '',
			procedureEndTime: '',
			deviceType: '',
			treatmentType: '',
		},
	},
});

export default function App(props: AppProps | any) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {},
				},
			})
	);
	const { Component, pageProps } = props;
	const getLayout = Component.getLayout ?? ((page: typeof Component) => page);
	const [supabase] = useState(() => createBrowserSupabaseClient());
	const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<>
			{/* <UserProvider> */}
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{ colorScheme }}
				>
					<StateMachineProvider>
						<NotificationsProvider position='top-right' zIndex={2077}>
							<QueryClientProvider client={queryClient}>
								<SessionContextProvider
									supabaseClient={supabase}
									initialSession={pageProps.initialSession}
								>
									<AuthProvider>
										<Hydrate state={pageProps.dehydratedState}>
											{getLayout(<Component {...pageProps} />)}
										</Hydrate>
									</AuthProvider>
								</SessionContextProvider>
							</QueryClientProvider>
						</NotificationsProvider>
					</StateMachineProvider>
				</MantineProvider>
			</ColorSchemeProvider>
			{/* </UserProvider> */}
		</>
	);
}
