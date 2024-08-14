import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import React from 'react';
import { Program } from '../../../../core/models/workout';

interface ProgramViewModeProps {
    program: Program
}

const ProgramViewMode: React.FC<ProgramViewModeProps> = ({ program }) => {
    const [activeTab, setActiveTab] = React.useState<number>(0);

    function onActiveTabChanged(event: React.SyntheticEvent, newValue: number) {
        setActiveTab(newValue);
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "end", alignItems: "center", marginBottom: "1rem" }}>
                <IconButton style={{ color: "#272343" }}><Edit /></IconButton>
                <IconButton style={{ color: "#272343" }}><Delete /></IconButton>
            </div>

            <div>
                <div style={{ marginBottom: "2rem" }}>
                    <strong style={{ fontSize: "1.3rem" }}>{program.title}</strong>
                </div>

                {program.description &&
                    <div className='margin-bottom-1'>
                        <div><strong>Description:</strong></div>
                        <div>{program.description}</div>
                    </div>
                }

                <div>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <Tabs value={activeTab} onChange={onActiveTabChanged} variant="scrollable">
                            <Tab label="Day 1" />
                            <Tab label="Day 2" />
                            <Tab label="Day 3" />
                            <Tab label="Day 4" />
                            <Tab label="Day 5" />
                            <Tab label="Day 6" />
                            <Tab label="Day 7" />

                            {program.programDays.map((day) => {
                                return <Tab label="Day 1" />
                            })}
                        </Tabs>
                        <div style={{border: "1px solid black"}}>
                            {activeTab}
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default ProgramViewMode