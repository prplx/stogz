import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import ShareContainer from '../../containers/share';
import Layout from 'components/Layout';
import User from 'types/user';

type Props = {
  user: User;
};

const SymbolPage: NextPage<Props> = ({ user }) => {
  const router = useRouter();

  return (
    <Layout title={router.query.symbol as string} user={user}>
      <ShareContainer symbol={router.query.symbol as string} />
    </Layout>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default SymbolPage;
