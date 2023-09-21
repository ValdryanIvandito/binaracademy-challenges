import React, { useState } from "react";
import { Card, Button, CardTitle, Table, Label, Input } from "reactstrap";

const dataCollection = [
  {
    id: 1,
    username: "PussySlayer613",
    email: "pussy.slay3r@gmail.com",
    experience: 600000,
    level: 600
  },
  {
    id: 2,
    username: "HardcoreLevellingWarrior",
    email: "hclw@gmail.com",
    experience: 600000,
    level: 600
  },
  {
    id: 3,
    username: "DemonSlayer777",
    email: "DemonSlayer@gmail.com",
    experience: 777777,
    level: 777
  },
  {
    id: 4,
    username: "ChaoticAngel618",
    email: "Angel618@gmail.com",
    experience: 666666,
    level: 666
  },
  {
    id: 5,
    username: "GodNika",
    email: "sungod@gmail.com",
    experience: 999999,
    level: 999
  }
];

const PlayerListPage = () => {
  // data
  const [player, setPlayer] = useState({ data: [...dataCollection] });

  // filters
  const [filterOptions, setFilterOptions] = useState({
    username: false,
    email: false,
    experience: false,
    level: false
  });

  const [filterValue, setFilterValue] = useState({
    username: "",
    email: "",
    experience: "",
    level: ""
  });

  // handle change
  function handleChange(event, filterType) {
    setFilterValue({ ...filterValue, [filterType]: event.target.value });
  }

  // handle filter
  function handleFilter() {
    const newList = dataCollection.filter(function (value) {
      if (filterOptions.username && value.username.includes(filterValue.username)) {
        return true;
      }
      if (filterOptions.email && value.email.includes(filterValue.email)) {
        return true;
      }
      if (filterOptions.experience && value.experience.toString().includes(filterValue.experience)) {
        return true;
      }
      if (filterOptions.level && value.level.toString().includes(filterValue.level)) {
        return true;
      }
      return false;
    });

    setPlayer({ data: newList });
  }

  // handle reset
  function handleReset() {
    setFilterOptions({
      username: false,
      email: false,
      experience: false,
      level: false
    });
    setFilterValue({
      username: "",
      email: "",
      experience: "",
      level: ""
    });
    setPlayer({ data: [...dataCollection] });
  }

  return (
    <div>
      <Card className="m-3 p-3" outline color="secondary">
        <CardTitle tag="h1">Player List</CardTitle>
        <hr />
        <div>
          <Label for="player-filter">Player Filter:</Label>
          <div className="d-flex justify-content-center">
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  checked={filterOptions.username}
                  onChange={() =>
                    setFilterOptions({
                      ...filterOptions,
                      username: !filterOptions.username
                    })
                  }
                />
                Username
              </Label>
              <Input
                type="text"
                onChange={(event) => handleChange(event, "username")}
                value={filterValue.username}
                disabled={!filterOptions.username}
                placeholder="Username"
              />
            </div>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  checked={filterOptions.email}
                  onChange={() =>
                    setFilterOptions({
                      ...filterOptions,
                      email: !filterOptions.email
                    })
                  }
                />
                Email
              </Label>
              <Input
                type="text"
                onChange={(event) => handleChange(event, "email")}
                value={filterValue.email}
                disabled={!filterOptions.email}
                placeholder="Email"
              />
            </div>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  checked={filterOptions.experience}
                  onChange={() =>
                    setFilterOptions({
                      ...filterOptions,
                      experience: !filterOptions.experience
                    })
                  }
                />
                Experience
              </Label>
              <Input
                type="text"
                onChange={(event) => handleChange(event, "experience")}
                value={filterValue.experience}
                disabled={!filterOptions.experience}
                placeholder="Experience"
              />
            </div>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  checked={filterOptions.level}
                  onChange={() =>
                    setFilterOptions({
                      ...filterOptions,
                      level: !filterOptions.level
                    })
                  }
                />
                Level
              </Label>
              <Input
                type="text"
                onChange={(event) => handleChange(event, "level")}
                value={filterValue.level}
                disabled={!filterOptions.level}
                placeholder="Level"
              />
            </div>
            <Button className="ml-3" color="primary" onClick={handleFilter}>
              Filter
            </Button>
            <Button className="ml-3" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </Card>
      <Card className="m-3 p-3" outline color="secondary">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Exp</th>
              <th>Lvl</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {player.data.map(function (data) {
              return (
                <tr key={data.id}>
                  <th scope="row">{data.id}</th>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>{data.experience}</td>
                  <td>{data.level}</td>
                  <td>
                    <Button color="info" size="sm">
                      Change Profile
                    </Button>
                  </td>
                  <td>
                    <Button color="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default PlayerListPage;