import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Log = () => (
  <Layout>
    <SEO title="Log" />
    <h1>Log</h1>
    <Link to="/">Home</Link>
  </Layout>
);

export default Log;
