import Leftover from "components/Leftover";
import { GetServerSideProps } from "next";
import React from "react";
import { getAllRecipes } from "services/recipes";
import { Product } from "types/Product";

const Restes = ({
  plannings,
}: {
  plannings: {
    recipes: Product[];
    startDate: string;
  }[];
}) => {
  return <Leftover plannings={plannings} />;
};

export const getServerSideProps: GetServerSideProps<{
  plannings: {
    recipes: Product[];
    startDate: string;
  }[];
}> = async () => {
  const plannings = await getAllRecipes();
  return {
    props: {
      plannings,
    },
  };
};

export default Restes;
