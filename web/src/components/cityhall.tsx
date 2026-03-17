import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  ActionIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import {
  IconSearch,
  IconBriefcase,
  IconInfoCircle,
  IconClick,
} from "@tabler/icons-react";

import { FaTaxi, FaBusAlt, FaTruck, FaIdCard, FaUser } from "react-icons/fa"; 
import { BsTruckFlatbed } from "react-icons/bs";
import { FaTrashCan, FaBoxesPacking } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";

type Job = {
  id: string;
  name: string;
  description: string;
  image: string;
};

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const jobIcons: Record<string, any> = {
  taxi: FaTaxi,
  tow: BsTruckFlatbed,
  truck: FaTruck,
  trucker: FaTruck,
  bus: FaBusAlt,
  garbage: FaTrashCan,
  unemployed: FaBoxesPacking,
  reporter: IoNewspaperSharp,
};

export default function CityHall({ visible, setVisible }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const playOpenSound = () => {
    const audio = new Audio("nui://krs_cityhall/web/sounds/open.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      
      if (event.data.action === "openCityHall") {
        playOpenSound();
        if (event.data.jobs) {
          setJobs(event.data.jobs);
          setSelectedJob(null);
          setVisible(true);
        }
      }
      
      if (event.data.action === "closeCityHall") {
        setVisible(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setVisible]);

  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const sendNui = (type: string, data: any = {}) => {
    fetch(`https://krs_cityhall/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      {visible && (
        <Box
          pos="fixed"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.01)" 
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
            zIndex: 9999,
            animation: "fadeIn 0.25s ease",
          }}
        >
          <Flex w="90%" h="85%" gap="xl">

            <Flex
              w="28%"
              h="100%"
              direction="column"
              gap="md"
              px="xs"
              style={{ overflow: "hidden" }}
            >

              <Box w="100%">
                <Group gap="md" align="center" mb="sm">
                  <ActionIcon size={45} variant="filled" color="#0496ff" radius="md">
                    <IconClick size="1.6rem" />
                  </ActionIcon>

                  <Title
                    order={1}
                    fw={900}
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "white",
                      fontSize: "2vw",
                      letterSpacing: "-1px",
                      lineHeight: 1
                    }}
                  >
                    CHOOSE A JOB
                  </Title>
                </Group>

                <Divider
                size="xs"
                style={{
                  borderColor: "transparent",
                  background: "linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0.05))",
                  height: 1,
                }}
              />
              </Box>

              <Box w="99.5%">
                <TextInput
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  placeholder="Search available positions..."
                  leftSection={<IconSearch size="1rem" color="#0496ff" />}
                  variant="unstyled"
                  styles={{
                    input: {
                      color: "white",
                      fontSize: "0.85vw",
                      backgroundColor: "rgba(255, 255, 255, 0.07)",
                      paddingLeft: "40px",
                      height: "42px",
                      borderRadius: "8px",
                      width: "99.5%",
                    },
                  }}
                />
              </Box>

              <Box w="100%" style={{ flex: 1, minHeight: 0 }}>
                <ScrollArea h="100%" offsetScrollbars scrollbarSize={4}>
                  <Stack gap="xs">

                    {filteredJobs.map((job) => {
                      const Icon = jobIcons[job.id] || IconBriefcase;

                      return (
                        <Flex
                          key={job.id}
                          w="100%"
                          h="75px"
                          bg={selectedJob?.id === job.id
                            ? "rgba(255, 255, 255, 0.07)"
                            : "rgba(255,255,255,0.03)"
                          }
                          style={{
                            borderRadius: "10px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            flexShrink: 0
                          }}
                          align="center"
                          px="md"
                          onClick={() => setSelectedJob(job)}
                        >
                          <Group gap="md">

                            <ActionIcon
                              variant="filled"
                              radius="md"
                              size={40}
                              color={selectedJob?.id === job.id ? "#0496ff" : "#007cd4"}
                            >
                              <Icon size="1.4rem" />
                            </ActionIcon>

                            <Stack gap={0}>
                              <Text fw={800} style={{ fontSize: "0.95vw", color: "white" }}>
                                {job.name}
                              </Text>

                              <Text size="xs" c="gray.5" fw={600} lineClamp={1}>
                                {job.description}
                              </Text>
                            </Stack>

                          </Group>
                        </Flex>
                      );
                    })}

                  </Stack>
                </ScrollArea>
              </Box>

              <Box 
                w="100%" 
                mt="auto" 
                p="md" 
                style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.07)", 
                  borderRadius: "15px",
                }}
              >
                <Group gap="xs" align="center" mb="xs">
                  <ActionIcon size={41} variant="filled" color="#0496ff" radius="md">
                    <FaUser size="1.2rem" color="white" />
                  </ActionIcon>
                  
                  <Text
                    fw={900}
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "white",
                      fontSize: "1.2vw",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase"
                    }}
                  >
                    IDENTITY DOCUMENTS
                  </Text>
                </Group>

                <Text size="xs" c="gray.5" mb="md" fw={600} style={{ lineHeight: 1.4 }}>
                  View or recover your official personal documents registered in the city.
                </Text>

                <Group grow gap="sm">
                  
                  <Button
                    variant="filled"
                    color="#0496ff"
                    h={42}
                    radius="md"
                    onClick={() => sendNui("selectID")}
                    style={{
                      boxShadow: "0px 4px 15px rgba(4,150,255,0.2)",
                      border: "none"
                    }}
                  >
                    <Text fw={900} size="md" style={{ textTransform: "uppercase" }}>ID CARD</Text>
                  </Button>

                  <Button
                    variant="filled"
                    color="#0496ff"
                    h={42}
                    radius="md"
                    onClick={() => sendNui("selectDrive")}
                    style={{
                      boxShadow: "0px 4px 15px rgba(4,150,255,0.2)",
                      border: "none"
                    }}
                  >
                    <Text fw={900} size="md" style={{ textTransform: "uppercase" }}>LICENSE</Text>
                  </Button>
                </Group>
              </Box>

            </Flex>

            <Flex w="72%" h="100%" justify="flex-end">
              <Box
                w="100%"
                maw="850px"
                p="xl"
                bg="rgba(255,255,255,0.03)"
                style={{
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >

                {selectedJob ? (
                  <>
                    <Group align="center" mb="xl">

                      <ActionIcon
                        size={65}
                        variant="filled"
                        color="#0496ff"
                        radius="md"
                      >
                        {(() => {
                          const Icon = jobIcons[selectedJob.id] || IconBriefcase;
                          return <Icon size="2.2rem" />;
                        })()}
                      </ActionIcon>

                      <Stack gap={0}>
                        <Title
                          order={1}
                          fw={900}
                          style={{
                            color: "white",
                            textTransform: "uppercase",
                            fontSize: "2.2vw",
                            lineHeight: 1
                          }}
                        >
                          {selectedJob.name}
                        </Title>

                        <Text c="gray.5" fw={700} size="md">
                          Employment Opportunity in Los Santos
                        </Text>
                      </Stack>

                    </Group>

                    <Box
                      w="100%"
                      h="360px"
                      mb="xl"
                      style={{
                        borderRadius: "15px",
                        overflow: "hidden",
                        backgroundColor: "rgba(0,0,0,0.2)"
                      }}
                    >
                      <img
                        src={
                          selectedJob.image ||
                          "nui://krs_cityhall/web/images/default.png"
                        }
                        alt="Job Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    </Box>

                    <Stack gap="md" style={{ flex: 1 }}>

                      <Group gap="xs">
                        <IconInfoCircle color="#0496ff" size="1.6rem" />

                        <Text
                          fw={900}
                          c="white"
                          size="lg"
                          style={{ letterSpacing: "1px" }}
                        >
                          JOB DESCRIPTION
                        </Text>
                      </Group>

                      <Divider color="rgba(255,255,255,0.08)" />

                      <ScrollArea h={150} type="hover">
                        <Text
                          c="gray.3"
                          fw={500}
                          size="lg"
                          style={{ lineHeight: 1.6 }}
                        >
                          {selectedJob.description}
                        </Text>
                      </ScrollArea>

                    </Stack>

                    <Center w="100%" mt="xl">
                      <Button
                        size="xl"
                        color="#0496ff"
                        fw={900}
                        radius="md"
                        px={80}
                        onClick={() =>
                          sendNui("selectJob", { job: selectedJob.id })
                        }
                        style={{
                          textTransform: "uppercase",
                          height: "60px",
                          fontSize: "1.2rem",
                          boxShadow: "0px 10px 30px rgba(4,150,255,0.3)"
                        }}
                      >
                        Send
                      </Button>
                    </Center>

                  </>
                ) : (
                  <Center h="100%" style={{ flexDirection: "column" }}>
                    <Stack align="center" gap="md" style={{ opacity: 0.25 }}>
                      <IconBriefcase size="7rem" color="white" />
                      <Text
                        c="white"
                        fw={800}
                        size="1.8rem"
                        ta="center"
                      >
                        SELECT A POSITION TO
                        <br />
                        VIEW DETAILS
                      </Text>
                    </Stack>
                  </Center>
                )}

              </Box>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
}