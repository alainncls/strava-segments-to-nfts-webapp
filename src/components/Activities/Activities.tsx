import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { IActivity } from '../../types/activity';

interface IProps {
  activities: IActivity[];
  checkForSegments: (activityId: string) => void;
}

const Activities = (props: IProps) => {
  const { activities, checkForSegments } = props;
  return (
    <div className="row">
      {activities?.length &&
        activities.map((activity) => (
          <div className="col-sm-6 mb-3" key={activity.id}>
            <Card>
              <Card.Header>
                <Card.Title>{activity.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <div>{new Date(Date.parse(activity.start_date)).toLocaleDateString()}</div>
              </Card.Body>
              <Card.Footer>
                <Button className="btn btn-primary btn-sm" onClick={() => checkForSegments(activity.id)}>
                  Check for eligible segments
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default Activities;
