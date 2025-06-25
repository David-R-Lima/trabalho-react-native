import { FetchCep } from "@/components/fetch-cep";
import { CepList } from "@/components/list-ceps";
import { ViaCep } from "@/services/viacep/types";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [cep, setCep] = useState<ViaCep | null>(null)

  return (
    <View style={styles.mainContainer}>
      <FetchCep setCep={setCep}></FetchCep>
      <CepList></CepList>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    width: "auto",
    height: "auto",
    alignItems: "center",
  }
});
