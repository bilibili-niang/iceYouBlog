import { defineComponent } from 'vue'
import Header from './components/Header'

export default defineComponent({
  name: 'Index',
  props: {},
  emits: [''],
  setup(props, { emit }) {

    return () => {
      return (
        <div className='index'>
          <Header />
          这里是首页
        </div>
      )
    }
  }
})
