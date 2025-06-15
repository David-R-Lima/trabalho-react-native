import { GetCep } from "@/services/viacep";
import { ViaCep } from "@/services/viacep/types";
import { Text } from "@react-navigation/elements";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Insira o cep</Text>
      <TextInput style={{
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 2,
        minWidth: 100
      }} onChangeText={(e) => {
        setText(e)
      }}></TextInput>
      <Button title="Fetch cep" onPress={() => {
        if(text) {
          mut.mutateAsync({
            cep: text
          })
        }
      }}></Button>
    </View>
  );
}
