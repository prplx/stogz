import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import WatchlistsContainer from '../containers/watchlists';
import Layout from '../components/Layout';
import User from 'types/user';

type Props = {
  user: User;
};

const WatchListsPage: NextPage<Props> = ({ user }) => {
  return (
    <Layout title="Watchlists" user={user}>
      <WatchlistsContainer />
    </Layout>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default WatchListsPage;
