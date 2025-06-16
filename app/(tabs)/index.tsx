import { FetchCep } from "@/components/fetch-cep";
import { CepList } from "@/components/list-ceps";
import { GetCep } from "@/services/viacep";
import { ViaCep } from "@/services/viacep/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [cep, setCep] = useState<ViaCep | null>(null)
  const [text, setText] = useState<string | null>(null)

  const mut = useMutation({
    mutationFn: GetCep,
    mutationKey: ["get-cep"],
    onSuccess: (data) => {
      setCep(cep)
    }
  })

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
    height: "auto"
  }
});
