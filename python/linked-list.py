# slow but sturdy linked list

class MyLinkedList:

    def __init__(self):
        self.head = '0'
        self.length = 0
        self.pointerCounter = 10000

    def __getitem__(self, key):
        return getattr(self, key)

    def getPointer(self):
        self.pointerCounter += 1
        return str(self.pointerCounter)

    def get(self, index: int) -> int:
        # find pointer at index
        if ((index >= self.length) | (index < 0)): 
            return -1
        lookAhead = self.head
        for i in range(0, index):
            lookAhead = self[lookAhead]['nextPtr'] 

        return self[lookAhead]['value']
            
    def addAtHead(self, val: int) -> None:
        # create new pointer and value/next pair
        pair = {'value': val, 'nextPtr': self.head}
        newPoint = self.getPointer()
        setattr(self, newPoint, pair)
        
        # update head
        self.head = newPoint
        
        # update length
        self.length += 1

    def addAtTail(self, val: int) -> None:
        # create new pointer and value/next pair
        pair = { 'value': val, 'nextPtr': '0' }
        newPoint = self.getPointer()
        setattr(self, newPoint, pair)
        
        # update tail
        tracker = [self.head, '-1']
        while(tracker[0] != '0'):
            tracker[1] = tracker[0]
            tracker[0] = self[tracker[0]]['nextPtr']
        if (tracker[1] != '-1'):
            self[tracker[1]]['nextPtr'] = newPoint
        else:
            self.head = newPoint

        # update length
        self.length += 1
        return

    def addAtIndex(self, index: int, val: int) -> None:
        # handle too high index
        if (index > self.length):
            return
    
        # handle index equals length
        if (index == self.length):
            self.addAtTail(val)
            return

        # find pointer for indexed item
        tracker = [self.head, '-1']
        for i in range(0, index):
            tracker[1] = tracker[0]
            tracker[0] = self[tracker[0]]['nextPtr']
        
        # create new pointer and value/next pair
        pair = { 'value': val, 'nextPtr': tracker[0] }
        newPoint = self.getPointer()
        setattr(self, newPoint, pair)

        # update the item before the new one        
        if (tracker[1] != '-1'):
            self[tracker[1]]['nextPtr'] = newPoint
        else:
            self.head = newPoint
            
        # update length
        self.length += 1
        return

    def deleteAtIndex(self, index: int) -> None:
        if (index >= self.length):
            return
        
        # find pointers before and at index
        tracker = [self.head, '-1']
        for i in range(0, index):
            tracker[1] = tracker[0]
            tracker[0] = self[tracker[0]]['nextPtr']

        # update the item before the deleted one
        if (tracker[1] != '-1'):
            self[tracker[1]]['nextPtr'] = self[tracker[0]]['nextPtr']
        else:
            self.head = self[tracker[0]]['nextPtr']
        
        # remove item from object
        delattr(self, tracker[0])
        
        # update length
        self.length -= 1
        
        return

obj = MyLinkedList()
obj.addAtHead(300)
obj.addAtHead(200)
obj.addAtHead(100)
print(vars(obj))
print('-----------')
print(obj.get(0))
print(obj.get(1))
print(obj.get(2))
print(obj.get(3))
print(obj.get(-1))
print('-----------')
obj.addAtTail(400)
print(vars(obj))
print('-----------')
obj.addAtIndex(2, 250)
print(vars(obj))
print('-----------')
obj.deleteAtIndex(3)
obj.deleteAtIndex(0)
print(vars(obj))
