import React from 'react';
import { Link } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

const LatestDeals = () => (
  <Layout>
    <SEO title="Latest" />
    <h1>Latest Deals</h1>
    <p>Welcome to your settings</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default LatestDeals;
