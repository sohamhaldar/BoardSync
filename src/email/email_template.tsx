import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
    Img
  } from '@react-email/components';

  
  interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    const logo='https://res.cloudinary.com/dnyi9ceiy/image/upload/v1720984833/BoardSync/p6ciulunbhump9kygw1q.png'
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Verification Code</title>
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
        <Preview>Hey {username}, Here&apos;s your verification code</Preview>
        <Section>
            <Row style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Img src={logo} className='h-8 w-10'/>
            <Text className='text-3xl font-bold m-2 bg-gradient-to-r from-custom-pink to-violet-500  inline-block text-transparent bg-clip-text leading-snug'>BoardSync</Text>
            </Row>
          <Row>
            <Heading as="h2">Hello {username},</Heading>
          </Row>
          <Row>
            <Text>
              Thank you for registering. Please use the following verification
              code to complete your registration:
            </Text>
          </Row>
          <Row className='flex justify-center items-center w-full h-auto' style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Text className='text-center'>{otp}</Text> 
          </Row>
          <Row>
            <Text>
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
          {<Row>
            <Button
              href={`http://localhost:3000/verify/${username}`}
              style={{ color: '#61dafb' }}
            >
              Verify here
            </Button>
          </Row> }
        </Section>
      </Html>
    );
  }