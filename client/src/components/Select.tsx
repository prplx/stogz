import ReactSelect, { Props, Styles } from 'react-select';
import { useColorMode } from '@chakra-ui/react';

const getStyles = (_: string): Styles<any, any> => ({
  control: p => ({
    ...p,
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0.16)',
  }),
  placeholder: p => ({
    ...p,
    color: 'grey',
  }),
  input: p => ({
    ...p,
    color: 'currentColor',
  }),
  menu: p => ({
    ...p,
    backgroundColor: '#2D3748',
  }),
  singleValue: p => ({
    ...p,
    color: 'currentColor',
  }),
  option: (p, { isFocused, isSelected }) => ({
    ...p,
    color: isFocused ? '#2c5282' : 'currentcolor',
    backgroundColor: isFocused
      ? '#bee3f8'
      : isSelected
      ? '#4299e1'
      : 'transparent',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
});

export default function Select(props: Props) {
  const { colorMode } = useColorMode();
  return <ReactSelect {...props} styles={{ ...getStyles(colorMode) }} />;
}
