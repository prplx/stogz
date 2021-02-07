import { NextPage, GetServerSidePropsContext } from 'next';
import { protect } from '../helpers';
import WatchlistsContainer from '../containers/watchlists';

const WatchListsPage: NextPage = () => <WatchlistsContainer />;

export default WatchListsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  await protect(ctx);

  return { props: {} };
};
