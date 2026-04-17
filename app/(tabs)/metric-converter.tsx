import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

type Unit = 'mm' | 'cm' | 'm' | 'km' | 'inch' | 'foot';

const UNITS: Unit[] = ['mm', 'cm', 'm', 'km', 'inch', 'foot'];

const TO_METERS: Record<Unit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  inch: 0.0254,
  foot: 0.3048,
};

export default function MetricConverterScreen() {
  const [inputValue, setInputValue] = useState('');
  const [sourceUnit, setSourceUnit] = useState<Unit>('m');
  const [targetUnit, setTargetUnit] = useState<Unit>('cm');

  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');

  const parseNumber = (value: string) => Number(value.trim().replace(',', '.'));

  const result = useMemo(() => {
    const numericValue = parseNumber(inputValue);

    if (Number.isNaN(numericValue)) {
      return null;
    }

    const valueInMeters = numericValue * TO_METERS[sourceUnit];
    return valueInMeters / TO_METERS[targetUnit];
  }, [inputValue, sourceUnit, targetUnit]);

  const formattedResult = useMemo(() => {
    if (result === null) {
      return '-';
    }

    return Number(result.toFixed(8)).toString();
  }, [result]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Metric Converter</ThemedText>
      <ThemedText>Enter a value, choose units, and convert.</ThemedText>

      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Value to convert"
        placeholderTextColor={borderColor}
        keyboardType="numeric"
        style={[styles.input, { color: textColor, borderColor }]}
      />

      <ThemedText type="defaultSemiBold">From</ThemedText>
      <UnitSelector
        units={UNITS}
        selectedUnit={sourceUnit}
        onSelect={setSourceUnit}
        tintColor={tintColor}
        borderColor={borderColor}
        textColor={textColor}
        backgroundColor={backgroundColor}
      />

      <ThemedText type="defaultSemiBold">To</ThemedText>
      <UnitSelector
        units={UNITS}
        selectedUnit={targetUnit}
        onSelect={setTargetUnit}
        tintColor={tintColor}
        borderColor={borderColor}
        textColor={textColor}
        backgroundColor={backgroundColor}
      />

      <ThemedText type="subtitle">
        {`Result: ${formattedResult} ${targetUnit}`}
      </ThemedText>
    </ThemedView>
  );
}

function UnitSelector({
  units,
  selectedUnit,
  onSelect,
  tintColor,
  borderColor,
  textColor,
  backgroundColor,
}: {
  units: Unit[];
  selectedUnit: Unit;
  onSelect: (unit: Unit) => void;
  tintColor: string;
  borderColor: string;
  textColor: string;
  backgroundColor: string;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.unitsRow}>
      {units.map((unit) => {
        const isSelected = selectedUnit === unit;

        return (
          <Pressable
            key={unit}
            onPress={() => onSelect(unit)}
            style={[
              styles.unitChip,
              {
                borderColor: isSelected ? tintColor : borderColor,
                backgroundColor: isSelected ? tintColor : backgroundColor,
              },
            ]}>
            <ThemedText
              type="defaultSemiBold"
              lightColor={isSelected ? '#ffffff' : textColor}
              darkColor={isSelected ? '#11181C' : textColor}>
              {unit}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  unitsRow: {
    gap: 8,
  },
  unitChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});