#include<bits/stdc++.h>
using namespace std;
class Player{
public:
    string name;
    int balance;
    Player(string name, int balance){
        this->name = name;
        this->balance = balance;
    }
};
vector<Player>memoryTable;
void start(int n,int m){
    for(int i=0;i<n;i++){
        string name;
        int balance;
        cout<<"Enter Players Details";
        cin>>name;
        memoryTable[i].name=name;
        memoryTable[i].balance=-m;
    }
}
void challenge(string name, int amount, int n){
    for(int i=0;i<n;i++){
        if(memoryTable[i].name==name){
            memoryTable[i].balance+=amount;
            break;
        }
    }
}
void gameMode1(int n, int m){
    start(n,m);
}
void gameMode2(int n,int m){
    start(n,m);
}
void game(){
    cout<<"Start Play!!\n";
    cout<<"Enter number of players: ";
    int n;cin>>n;
    if(!n){
        while(!n){
            cout<<"\nEnter Valid number of players\n";
            cin>>n;
        }
    }
    cout<<"Select any option:\n1. Money for every round\n2. Money until money exists on table ";
    int op;cin>>op;
    cout<<"Enter the money being kept for every new game:";
    int m;cin>>m;
    if(op==1)   gameMode1(n,m);
    if(op==2)   gameMode2(n,m);
}
int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    game();
    return 0;
}