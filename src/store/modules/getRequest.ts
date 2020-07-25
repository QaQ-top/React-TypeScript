import { action, observable } from 'mobx'
import { StoreModule } from '@/utils/mobx-store-module'

class getRequest extends StoreModule {
    @observable 
    public  array:object[] = [{}]

    @action
    public add = (data:[]) => {
        this.array.push(...data)
    }

    
}



export default new getRequest()