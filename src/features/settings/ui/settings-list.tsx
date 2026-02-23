import { Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const SettingsList = () => {
    const { t } = useTranslation();

    return (
        <Title order={2}>{t('main.settings')}</Title>
    )
};