import { ActionIcon, AppShell, Avatar, Burger, Flex, Group, Menu, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useTranslation } from "react-i18next";
import { HiGlobeAlt } from "react-icons/hi2";

const Layout = () => {
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    const toggleLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding={'md'}
        >
            <AppShell.Header>
                <Group h={'100%'} px={'md'} justify="space-between">
                    <Group gap="xs">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size={'sm'} />
                        <Flex
                            align={'center'}
                            gap='xs'
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(ROUTES.HOME)}
                        >
                            <Avatar src='/src/assets/logo.png' size={"sm"} />
                            <Text fw={700} size="lg">Task|Manager</Text>
                        </Flex>
                    </Group>

                    <Group>
                        <Menu shadow="md" width={150} position="bottom-end">
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="indigo" size="lg">
                                    <HiGlobeAlt size="25px" />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    onClick={() => toggleLanguage('kk')}
                                    rightSection={i18n.language === 'kk' ? "✓" : null}
                                >
                                    {t('lang.kk')}
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() => toggleLanguage('ru')}
                                    rightSection={i18n.language === 'ru' ? "✓" : null}
                                >
                                    {t('lang.ru')}
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p={'md'}>
                <NavLink
                    label={t('main.tasks')}
                    onClick={() => navigate(ROUTES.TASKS)}
                    active={window.location.pathname === ROUTES.TASKS}
                />
                <NavLink
                    label={t('main.settings')}
                    onClick={() => navigate(ROUTES.SETTINGS)}
                    active={window.location.pathname === ROUTES.SETTINGS}
                />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

export default Layout;