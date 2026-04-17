import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function SummatorScreen() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon');

  const parseNumber = (value: string) => Number(value.trim().replace(',', '.'));

  const calculateSum = () => {
    const first = parseNumber(firstNumber);
    const second = parseNumber(secondNumber);

    if (Number.isNaN(first) || Number.isNaN(second)) {
      setResult(null);
      return;
    }

    setResult(first + second);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Summator</ThemedText>
      <ThemedText>Enter two numbers and calculate their sum.</ThemedText>

      <TextInput
        value={firstNumber}
        onChangeText={setFirstNumber}
        placeholder="First number"
        placeholderTextColor={borderColor}
        keyboardType="numeric"
        style={[styles.input, { color: textColor, borderColor }]}
      />

      <TextInput
        value={secondNumber}
        onChangeText={setSecondNumber}
        placeholder="Second number"
        placeholderTextColor={borderColor}
        keyboardType="numeric"
        style={[styles.input, { color: textColor, borderColor }]}
      />

      <Button title="Calculate" onPress={calculateSum} />

      <ThemedText type="subtitle">
        {result === null ? 'Result: -' : `Result: ${result}`}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    gap: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});