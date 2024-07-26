import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Section,
  Text,
  Button,
  Img,
  Body,
  Container,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  const logo = 'https://res.cloudinary.com/dnyi9ceiy/image/upload/v1720984833/BoardSync/p6ciulunbhump9kygw1q.png';
  
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Hey {username}, Here's your verification code</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src={logo} width="auto" height="50" alt="BoardSync Logo" style={logoImage} />
            <Text style={logoText}>BoardSync</Text>
          </Section>
          <Heading as="h2" style={h2}>Hello {username},</Heading>
          <Text style={text}>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
          <Section style={codeContainer}>
            <Text style={code}>{otp}</Text>
          </Section>
          <Text style={text}>
            If you did not request this code, please ignore this email.
          </Text>
          <Button style={button} href={`https://boardsync.vercel.app/auth/u/${username}`}>
            Verify here
          </Button>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '"Roboto", "Verdana", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logoContainer = {
  marginBottom: '32px',
  textAlign: 'center' as const,
};

const logoImage = {
  margin: '0 auto',
  display: 'block',
};

const logoText = {
  color: '#000',
  fontSize: '32px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  textDecoration: 'none',
  marginTop: '10px',
};

const h2 = {
  color: '#525f7f',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  margin: '0 0 30px',
  textAlign: 'center' as const,
};

const codeContainer = {
  background: 'rgba(0,0,0,.05)',
  borderRadius: '4px',
  marginBottom: '30px',
  padding: '20px 0',
};

const code = {
  color: '#000',
  fontSize: '36px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0',
};

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  margin: '0 auto',
  paddingRight:20,
  paddingLeft:20,
  paddingTop:12,
  paddingBottom:12,
};