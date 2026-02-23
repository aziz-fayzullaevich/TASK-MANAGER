import { Button, Group, Stack, Text, Title } from "@mantine/core"
import { useTranslation } from "react-i18next";

const NotFound = () => {
    const {t} = useTranslation();

    return (
        <div className="container">
            <Stack justify="center" h={'100vh'} align="center">
                <Title order={1}>404</Title>
                <Text>Страница не найдена</Text>
                <Group>
                    <Button variant="gradient" size="md">{t('main.main-page')}</Button>
                </Group>
            </Stack>
        </div>
    )
}

export default NotFound;