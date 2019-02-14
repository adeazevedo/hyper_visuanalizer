<template>
    <v-card>
        <v-layout row wrap pa-0>
            <v-flex xs6>
                <v-treeview :active.sync="active" :items="items"  :open.sync="open" activatable  :load-children="selectedItem" open-on-click ></v-treeview>
            </v-flex>
            <v-flex xs6>
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
         apis: [ {id: '1', name: 'http://127.0.0.1:8000/api/bcim/', children: []} ],      
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
        console.log('selecio')
        return this.apis.find(api => api.id === id)
      }
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
        isEntryPoint(link_header) {
            return link_header.toLowerCase().indexOf('//schema.org/entrypoint') > - 1
        },
        async selectedItem(item){
            console.log(item)
            if (!item)
                return
            let response = await this.request(item.name,axios.head)  
            if (!this.isEntryPoint(response.headers.link)) 
                return 
            response = await this.request(item.name)  

            let id = 1
            let children = []
            
            for (let [key, value] of Object.entries(response.data)) {
                id++
                let id_str = ''+ item.id + id
                let obj = {id: id_str, name: value}
                children.push(obj)
            }
            
            item.children= children
            
            
        }
    },
    
}
</script>
