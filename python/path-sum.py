# Accepted solution for LeetCode 112; faster than 65% less memory than 15%

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if root == None:
            return False
        return pathTotal(self, root, targetSum, 0)
        
        
def pathTotal(self, root, targetSum, currentTotal):        
    print(root.val)
        
    if root.left:
        if pathTotal(self, root.left, targetSum, currentTotal + root.val):
            return True
            
    if root.right:
        if pathTotal(self, root.right, targetSum, currentTotal + root.val):
            return True
            
    if not root.left and not root.right:
        print("I am a leaf; my total is:", currentTotal + root.val)
        if currentTotal + root.val == targetSum:
            return True
            
