import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Settings = () => (
  <Layout>
    <SEO title="Settings" />
    <h1>Settings</h1>
    <p>Welcome to your settings</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default Settings;
