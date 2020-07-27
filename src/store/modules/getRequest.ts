import { action, observable } from 'mobx'
import { StoreModule } from '@/utils/mobx-store-module'

interface item {
    id:string
    [key:string]:string
}
class getRequest extends StoreModule {
    @observable 
    public  state = {
        array : [] as item[]
    }

    @action
    public add = (data:[]) => {
        this.state.array.push(...data)
    }

}



export default new getRequest()