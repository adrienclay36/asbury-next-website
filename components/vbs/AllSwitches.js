import React from 'react'
import { Switch } from '@mantine/core'
const AllSwitches = ({ booleanValues, setBooleanValues }) => {
  return (
    <>
      <p className="text-lg font-semibold my-6">
        I prefer to work with the following ages
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 my-4 gap-y-4">
        <Switch
          value={booleanValues.prefer_prek}
          label="Pre-K"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              prefer_prek: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.prefer_kindergarten}
          label="Kindergarten"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              prefer_kindergarten: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.prefer_first}
          label="First Grade"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              prefer_first: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.prefer_second}
          label="Second Grade"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              prefer_second: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.prefer_third}
          label="Third Grade"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              prefer_third: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.prefer_fourth}
          label="Fourth Grade"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              prefer_fourth: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.prefer_fifth}
          label="Fifth Grade"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              prefer_fifth: value.currentTarget.checked,
            })
          }
        />
      </div>
      <p className="text-lg font-semibold my-6">
        Before, I would like to help by:
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 my-4 gap-y-4">
        <Switch
          value={booleanValues.help_advance_calls}
          label="Making Advance Telephone Calls"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              help_advance_calls: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.help_distributing_materials}
          label="Distributing Publicity Materials"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              help_distributing_materials: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.help_preparing_lesson_sites}
          label="Preparing Lesson Sites"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              help_preparing_lesson_sites: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.help_preparing_craft_materials}
          label="Preparing Craft Materials"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              help_preparing_craft_materials: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.help_preparing_vbs_env}
          label="Creating The VBS Environment"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              help_preparing_vbs_env: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.help_wherever}
          label="Wherever I Am Needed"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              help_wherever: value.currentTarget.checked,
            })
          }
        />
      </div>
      <p className="text-lg font-semibold my-6">
        During, I would like to help with:
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 my-4 gap-y-6">
        <Switch
          value={booleanValues.during_teaching}
          label="Assembly"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_teaching: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_crafts}
          label="Crafts"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_crafts: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_transportation}
          label="Transportation"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_transportation: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_assembly}
          label="Assembly"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_assembly: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_registration}
          label="Registration"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_registration: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_refreshments}
          label="Refreshments"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_refreshments: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_assisting_in_classroom}
          label="Assisting In The Classroom"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_assisting_in_classroom: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_missions}
          label="Missions"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_missions: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_cleanup}
          label="Cleanup"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_cleanup: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_site_leader}
          label="Being A Site Leader"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_site_leader: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_music}
          label="Music"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_music: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_child_care}
          label="Child Care"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_child_care: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_crew_leader}
          label="Being A Crew Leader"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_crew_leader: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_recreation}
          label="Reacreation"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_recreation: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_science}
          label="Science"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_science: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.during_wherever}
          label="Wherever I Am Needed"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              during_wherever: value.currentTarget.checked,
            })
          }
        />
      </div>
      <p className="text-lg font-semibold my-6">
        After, I would like to help with:
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 my-4 gap-y-6">
        <Switch
          value={booleanValues.after_calling_families}
          label="Calling Families Of Attendees"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              after_calling_families: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.after_mailing}
          label="Helping With Follow Up Mailings"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              after_mailing: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.after_tear_down}
          label="Tearing Down"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              after_tear_down: value.currentTarget.checked,
            })
          }
        />
        <Switch
          value={booleanValues.after_wherever}
          label="Wherever I Am Needed"
          onChange={(value) =>
            setBooleanValues({
              ...booleanValues,
              after_wherever: value.currentTarget.checked,
            })
          }
        />
      </div>
    </>
  );
}

export default AllSwitches