import React, { useEffect, useState } from 'react'
import SectionHeading from '../ui/section-heading'
import parse from 'html-react-parser';
import { supabase } from '../../supabase-client';
const LivestreamSection = () => {
    const [source, setSource] = useState('');

    const getSource = async () => {
        const { data } = await supabase.from('live_source').select();
        if(data.length > 0) {
            setSource(data[0].source);
        }
    }
    
    useEffect(() => {
        getSource();
    },[])
  return (
    <SectionHeading title="Livestream">
      {source && (
        <div className="flex flex-1 justify-center items-center w-full lg:w-3/6 md:w-3/6 mx-auto">
          {parse(source)}
        </div>
      )}

      {!source && <div className="container text-center">
        <h1 className="text-lg font-semibold mb-4">Join us on Sundays for live worship!</h1>
        <p className="text-lg">We aren&apos;t live now, but we will be on Sundays at 8:30AM and 11:00AM</p>
      </div>}
    </SectionHeading>
  );
}

export default LivestreamSection