import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { SchedulerData, ViewTypes } from "react-big-scheduler";
import Scheduler from "react-big-scheduler";
import moment from "moment";
import withDnDContext from "../../util/withDnDContext";
import "react-big-scheduler/lib/css/style.css";

import {
  getOpenedProjectSectionsRequest,
  getTasksBySectionsAndProjectIdRequest,
} from "../../util/backendRequests";
import { setOpenedProjectSections } from "../../app/slices/openedProjectSectionsSlice";
import { setOpenedProjectTasks } from "../../app/slices/openedProjectTasksSlice";

export interface ProjectTimelinePropType {
  projectID: string | number;
}

const ProjectTimeline: React.FC<ProjectTimelinePropType> = ({ projectID }) => {
  const openedProjectSections = useSelector(
    (state: RootState) => state.openedProjectSections
  );
  const openedProjectTasks = useSelector(
    (state: RootState) => state.openedProjectTasks
  );
  const [resources, setResources] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const dispatch = useDispatch();

  let schedulerData = new SchedulerData(
    new (moment as any)().format(),
    ViewTypes.Month,
    false,
    false
  );

  useEffect(() => {
    getOpenedProjectSectionsRequest(projectID).then(
      ({ data }) => {
        dispatch(setOpenedProjectSections(data));
      },
      (error) => {
        // dispatch(errorAlert(error.toString()));
        // dispatch(neutralAlertAsync());
      }
    );
    getTasksBySectionsAndProjectIdRequest(projectID).then(({ data }) => {
      dispatch(setOpenedProjectTasks(data));
    });
    return () => {
      dispatch(setOpenedProjectSections([]));
      dispatch(setOpenedProjectTasks([]));
    };
  }, [projectID]);

  useEffect(() => {
    let resources: any[] = [];
    let events: any[] = [];
    Object.values(openedProjectSections).forEach(({ id, name }) => {
      resources.push({ id, name });
    });
    Object.values(openedProjectTasks)
      .slice()
      .sort((a, b) => {
        if (b.due_date < a.due_date) {
          return -1;
        }
        if (b.due_date > a.due_date) {
          return 1;
        }
        return 0;
      })
      .forEach(({ id, section_id, title, due_date }) => {
        events.push({
          id,
          start: due_date
            ? due_date.length === 10
              ? `${due_date} 00:00:00`
              : "2020-08-08 00:00:00"
            : "2020-08-08 00:00:00",
          end: due_date
            ? due_date.length === 10
              ? `${due_date} 23:59:00`
              : "2020-08-08 23:59:00"
            : "2020-08-08 23:59:00",
          resourceId: section_id,
          title,
          bgColor: "#56DE9C",
        });
      });
    setEvents(events);
    setResources(resources);
  }, [openedProjectTasks, openedProjectSections]);

  schedulerData.setResources(resources);

  schedulerData.setEvents(events);
  const prevClick = (schedulerData: any) => {
    schedulerData.prev();
    schedulerData.setEvents(events);
  };
  const nextClick = () => {};
  const onSelectDate = () => {};
  const onViewChange = () => {};
  const eventClicked = () => {};
  return (
    <div
      className="px-4 bg-customBlue-100 rounded-lg h-full relative text-white"
      style={{ minWidth: `${window.innerWidth - 290}px` }}
    >
      <div
        className="bg-customBlue-120 mx-auto px-4 pt-3"
        style={{ minHeight: `${window.innerHeight - 190}px` }}
      >
        <Scheduler
          schedulerData={schedulerData}
          prevClick={prevClick}
          nextClick={nextClick}
          onSelectDate={onSelectDate}
          onViewChange={onViewChange}
          // eventItemClick={eventClicked}
        />
      </div>
    </div>
  );
};

export default withDnDContext(ProjectTimeline);
