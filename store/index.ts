import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { apiRequestPost } from '@/store/helper'

export const state = () => ({
  item: {} as any
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  item: state => state.item
}

export const mutations: MutationTree<RootState> = {
  setItem (state, data:any): void {
    state.item = data
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async itemFindBySerial (context, serialNumber:string): Promise<void> {
    try {
      const url:string = `${this.$axios.defaults.baseURL}/login`
      const response = await apiRequestPost(context, url, { serialNumber })
      context.commit('setItem', response.body)
    } catch (e) {
      console.log(e)
    }
  }

}
