

// components/CepList.tsx
import { ViaCep } from '@/services/viacep/types';
import { fetchAllCeps } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DisplayCep } from './list-one-cep';

export function CepList() {
    const [selectedCep, setSelectedCep] = useState<ViaCep | null>(null);

  const { data } = useQuery({
    queryKey: ["ceps"],
    queryFn: fetchAllCeps
  })

  if (data && data.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No CEPs found.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {data?.map((cep, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => setSelectedCep(cep)}
          >
            <Text style={styles.cepText}>{cep.cep}</Text>
            <Text style={styles.addressText}>
              {cep.logradouro}, {cep.bairro}
            </Text>
            <Text>
              {cep.localidade} - {cep.uf}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedCep && (
        <DisplayCep
          cep={selectedCep}
          visible={!!selectedCep}
          onClose={() => setSelectedCep(null)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cepText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
