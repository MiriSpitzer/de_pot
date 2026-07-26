import React from 'react';
import {Html, Body, Container, Section, Heading, Text, Img} from "@react-email/components";

const NewMemberEmail = ({name, groupname}: {name: string, groupname: string}) => {
    return (
        <Html>
            <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#B3CFD0', padding: '24px 0' }}>
                <Container style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
                    <Heading style={{ fontSize: '24px', lineHeight: '32px', margin: '0 0 16px', color: '#1f2937' }}>
                        Je bent toegevoegd als lid bij de pot
                    </Heading>

                    <Text style={{ fontSize: '16px', lineHeight: '24px', color: '#374151', margin: '0 0 12px' }}>
                        Hallo {name},
                    </Text>
                    <Text style={{ fontSize: '16px', lineHeight: '24px', color: '#374151', margin: '0 0 12px' }}>
                        Je werd door de beheerder van de pot van {groupname} toegevoegd als lid.
                    </Text>
                    <Text style={{ fontSize: '16px', lineHeight: '24px', color: '#374151', margin: '0 0 20px' }}>
                        Fijn om je erbij te hebben! 😉
                    </Text>

                    <Section style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px', textAlign: 'center' }}>
                        <Text style={{ fontSize: '12px', lineHeight: '18px', color: '#6b7280', margin: '0 0 16px' }}>
                            Dit is een no-reply e-mail. Antwoorden op deze mail worden niet gelezen.
                        </Text>
                        <Img
                            src="https://raw.githubusercontent.com/MiriSpitzer/de_pot/main/public/logo_full.png"
                            alt="Pot logo"
                            width={220}
                            height={92}
                            style={{ maxWidth: '160px', height: 'auto', display: 'block', margin: '0 auto' }}
                        />
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

export default NewMemberEmail;
