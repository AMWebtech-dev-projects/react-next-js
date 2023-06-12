import { AppProps } from "next/app";
import Head from "next/head";
import "../../styles/style.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper, persistor, RootState } from "../redux/store";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import FullLayout from "../components/layouts/FullLayout";
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const token = useSelector(
    (state: RootState) => state?.login?.loginData?.authorization
  );

  useEffect(() => {
    // Redirect users who are not authenticated to the login page
    if (!token && router.pathname !== "/login") {
      router.push("/login");
    }
    // Redirect users who are authenticated to the dashboard page
    if (token && router.pathname === "/login") {
      router.push("/dashboard");
    }
  }, [token, router.pathname]);

  return (
    <>
    
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>NextJs-bootstrap</title>
      </Head>
      <Script
      src={
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'
      }
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"
      />
      <Toaster position="top-right" />
      <PersistGate loading={null} persistor={persistor}>
        {router.pathname === "/login" ? (
          <Component {...pageProps} />
        ) : (
          <FullLayout>
            <Component {...pageProps} />
          </FullLayout>
        )}
      </PersistGate>
    </>
  );
}

export default wrapper.withRedux(MyApp);
