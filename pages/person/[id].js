import React from "react";
import axios from "axios";
import Head from "next/head";

const PersonPage = ({ person, error }) => {
  if (error) {
    return <div>{error}</div>;
  }

  const description = `Details of ${person.Forename} ${person.SurName}, born on ${person.DOB}`;

  return (
    <div>
      <Head>
        <title>{person.Forename}'s V Card</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={person.Forename} />
        <meta property="og:description" content={description} />
      </Head>
      <h1>Person Details</h1>
      <p>
        <strong>Forename:</strong> {person.Forename}
      </p>
      <p>
        <strong>SurName:</strong> {person.SurName}
      </p>
      <p>
        <strong>DOB:</strong> {person.DOB}
      </p>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/person`,
      {
        params: { id },
      }
    );
    return {
      props: {
        person: response.data,
      },
    };
  } catch (err) {
    return {
      props: {
        error: "Person not found",
      },
    };
  }
}

export default PersonPage;
