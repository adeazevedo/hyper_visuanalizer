<template>
    <v-card>
        <v-layout justify-space-between pa-0>
            <v-flex xs12>
                <v-treeview :active.sync="active" :items="items"  :open.sync="open" activatable  open-on-click ></v-treeview>
            </v-flex>
            <v-flex xs1>
                <span> Desc</span>
            </v-flex>
        </v-layout>    
    </v-card>    
    
</template>
<script>
import axios from 'axios'
export default {
    props: {
        name: {type: String, required: false},
        optionsLayer: { type: Object, required: false}, // Items is Array. each Item  is an object => {name: a_name, value: a_value }
        icon_name: {type: String, required: false},
        title: {type: String, required: false},
    },
    data() {
        return {
         apis: [ {id: '1', name: 'http://127.0.0.1:8000/api/bcim/'} ],      
         active: [],
         open: [],
        }
    },
    computed: {
      items () {
        return [
          {
            name: 'Apis',
            children: this.apis
          }
        ]
      },
      selected() {
        if (!this.active.length) return undefined
        const id = this.active[0]
        return this.apis.find(api => api.id === id)
      }
    },
    watch: {
      selected: 'selectedItem'
    },
    methods: {
        async request(url, http_method=axios.get) {
            let iri = null
            try {
                return await http_method(url)
                
            } catch (e) {
                this.errors.push(e)
                console.log("Houve algum erro durante a requisição. " + this.errors);
            }
        },
        loadAPI(item) {
            alert("item")
        },
        async selectedItem(item){
            if (!item)
                return
            let response = await this.request(item.name)  
            console.log(item.name)
            console.log(response.data)
            item.children = response.data
        }
    },
    
}
</script>
