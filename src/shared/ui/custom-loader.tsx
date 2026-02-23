import { Center, Loader } from "@mantine/core"

export const CustomLoader = () => {
    return (
        <Center h="100vh">
            <Loader color="gray" size="80px" type="dots" />
        </Center>
    )
}