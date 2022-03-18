import { Button, Text, View } from "react-native";

function Home({navigation}) {

    return(
        <View>
            <Button title="navigate" onPress={() => navigation.navigate('Signup')}/>
        </View>
    )

}
export default Home;