import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ShareContainer from '../../containers/share';

const SymbolPage: NextPage = () => {
  const router = useRouter();
  return <ShareContainer symbol={router.query.symbol as string} />;
};

export default SymbolPage;
