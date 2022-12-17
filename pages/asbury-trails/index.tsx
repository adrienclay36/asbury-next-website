import React from 'react'
import Layout from '../../components/layout/layout';
import TrailsList from '../../components/asbury-trails/trails-list';
import SectionHeading from '../../components/ui/section-heading';
import { supabase } from '../../supabase-client';
import { GetStaticProps } from 'next';
import { AsburyTrailsItem } from '../../types/asbury-trails-item';

interface Props {
    files: AsburyTrailsItem[];
}
const AsburyTrailsHome: React.FC<Props> = ({ files }) => {
    return (
        <Layout title="Asbury Trails" description="The official monthly newsletter for Asbury United Methodist Church, where you can find information regarding all the latest events and news around the community.">
            <SectionHeading title="Asbury Trails">
                <TrailsList files={files} />
            </SectionHeading>
        </Layout>
    )
}

export default AsburyTrailsHome

export const getStaticProps: GetStaticProps = async (context) => {
    const { data, error } = await supabase.from('asbury_trails').select().order('created_at', { ascending: false })
    return {
        props: {
            files: data
        },
        revalidate: 10,
    }
}