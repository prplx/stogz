import { useState, useEffect } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { Flex } from '@chakra-ui/react';

type Props = {
  symbol: string;
};

export default function ShareContainer({ symbol }: Props) {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  return (
    <Flex p={[4, 4, 6]} wrap="wrap" h="100%">
      {rendered && (
        <TradingViewWidget
          symbol={symbol}
          theme={Themes.DARK}
          locale="en"
          autosize
        />
      )}
    </Flex>
  );
}
