import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import WatchlistsContainer from '../containers/watchlists';
import Layout from '../components/Layout';

const WatchListsPage: NextPage = ({ user }: any) => {
  return (
    <Layout title="Watchlists" user={user}>
      <WatchlistsContainer />
    </Layout>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default WatchListsPage;
