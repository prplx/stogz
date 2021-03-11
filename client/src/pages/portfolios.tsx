import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout';
import User from 'types/user';
import PortfoliosContainer from 'containers/portfolios';

type Props = {
  user: User;
};

const PortfoliosPage: NextPage<Props> = ({ user }) => {
  return (
    <Layout title="Portfolios" user={user}>
      <PortfoliosContainer />
    </Layout>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default PortfoliosPage;
